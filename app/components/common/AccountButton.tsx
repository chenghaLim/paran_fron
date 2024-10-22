"use client";
import { useEffect, useState } from "react";
import { TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { v4 } from "uuid";
import { accountService } from "@/app/service/room/account.service";
import { AccountResultModel, AmountModel } from "@/app/model/room/account.model";
import { useSelector } from "react-redux";
import { getCurrentBooking } from "@/lib/features/room/booking.slice";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { useAppDispatch } from "@/lib/store";
import { saveLoading } from "@/lib/features/room/account.slice";

interface TossPaymentResponse {
    orderId: string;
    paymentKey: string;
    amount: {
        value: number;
    };
}

export default function AccountButton(): JSX.Element {
    const dispatch = useAppDispatch();
    // 입력 받은 값
    const orderName: string = "1회 모임";
    const amountValue: number = 5000;
    const booking = useSelector(getCurrentBooking);
    const user = useSelector(getCurrentUser);
    const usePoint: number = 0;
    const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
    const [amount] = useState<AmountModel>({
        currency: "KRW",
        value: amountValue,
    });

    useEffect(() => {
        async function fetchPayment(): Promise<void> {
            try {
                accountService.load(dispatch).then(data => {
                    if (data) {
                        setPayment(data)
                    }
                })
                dispatch(saveLoading(false))
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }
        fetchPayment();
    }, [dispatch]);

    const requestPayment = async (): Promise<void> => {
        if (!payment) {
            console.error("Payment instance is not initialized.");
            return;
        }
        const today = new Date();
        const orderDate = "".concat(
            today.getFullYear().toString(),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0')
        );
        try {
            // 카드결제
            await payment.requestPayment({
                method: "CARD",
                amount: amount,
                orderId: orderDate + v4().substring(0, 50),
                orderName: orderName,
                customerName: user?.nickname || "",
                windowTarget: "iframe",
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            })
                .then(
                    function resp(response: TossPaymentResponse | void) {
                        if (response && booking) {
                            const model: AccountResultModel = {
                                orderId: response.orderId,
                                paymentKey: response.paymentKey,
                                amount: response.amount.value,
                                orderName: orderName,
                                roomId: booking.roomId,
                                groupId: booking.groupId,
                                bookingId: booking.id ?? 0,
                                usePoint: usePoint,
                            };
                            accountService.insert(model, dispatch).then((paymentResponse) => {
                                if (paymentResponse) {
                                    console.log("결제 성공");
                                }
                            });
                        }
                    });
        } catch (error) {
            console.error("Payment request failed:", error);
        }
    };

    return (
        <div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={requestPayment}>결제하기</button>
        </div>
    );
}
