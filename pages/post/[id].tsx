import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import SingleComment from "../../components/SingleComment";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen">
      <nav className="h-14 flex justify-between items-center text-2xl px-4 sticky bg-[#fafafa] top-0">
        <Link href="/">
          <BsArrowLeft />
        </Link>
        <span className="text-xl font-semibold">Comments</span>
        <FiSend />
      </nav>
      <section className="min-h-[100px] flex px-3 space-x-3">
        <aside className="py-3">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
        </aside>
        <aside className="w-full">
          <span className="text-sm font-semibold">Rounak Kumbhakar</span>
          <span className="text-sm text-gray-600 mx-3">2d</span>
          <p className="text-sm my-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
            inventore id quia quod ipsum est voluptatibus, doloremque veritatis
            cumque dolores assumenda iusto aspernatur deleniti error, pariatur,
            culpa voluptate eum. Commodi.
          </p>
        </aside>
      </section>
      <hr />
      <main className="space-y-6">
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
      </main>
      <p>Post: {id}</p>
    </div>
  );
};

export default Post;
