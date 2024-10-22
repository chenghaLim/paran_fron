import "./globals.css";
import Map from "./components/common/Map";
import RecommendBook from "./components/chat/ChatBot/RecommendBook";
import Carousel from "./components/common/Carousel";
import TabButton from "./components/common/Row/TabButton";

export default function Home() {
  return (
    <div id="home">
      <section className="artWrap">
        <span className="bgEffect"></span>
        <Carousel />
      </section>
      <main className="flex min-h-screen items-center justify-center gap-2">
        <section className="size-90 my-8" id="rowColum">
          <TabButton />
        </section>
        <RecommendBook />
      </main>
      <article>
        <Map />
      </article>
    </div>
  );
}
