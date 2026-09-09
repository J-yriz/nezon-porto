// Color Pallate: https://colorhunt.co/palette/1e03420e46a39ac8cde1f7f5
import Header from "@/components/Header";
import PostProduct from "@/components/postProduct";
import ToTop from "@/components/ToTop";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1600px]">
      <Header />
      <PostProduct />
      <ToTop />
    </main>
  );
}
