import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGroups, getIsLoading, getError, getUserGroups } from '@/lib/features/group/group.slice';
import GroupCard from './GroupCard';
import LoadingSpinner from '../status/LoadingSpinner';
import ErrorMessage from '../status/ErrorMessage';
import { groupService } from '@/app/service/group/group.service';
import { useAppDispatch } from '@/lib/store';
import Pagination from './pagination/Pagination';

interface MyGroupRowProps {
    active: boolean;
    onSelect: () => void;
}

const MyGroupRow = ({ active, onSelect }: MyGroupRowProps) => {
    const dispatch = useAppDispatch();
    const groups = useSelector(getUserGroups);
    const loading = useSelector(getIsLoading);
    const error = useSelector(getError);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const totalItems = groups;

    useEffect(() => {
        groupService.findList(page, pageSize, dispatch);
    }, [page, pageSize]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <div className="w-[92%] mb-4 ml-4 grid grid-cols-4 gap-6 md:grid-cols-3">
                {groups.map((group, index) => (
                    <GroupCard key={index} group={group} active={active} onSelect={onSelect} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </>
    );
};

export default MyGroupRow;