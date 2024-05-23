import { Tweet, Comment } from "../components/components";

function PostPage() {
  return (
    <div className="px-5 sm:px-10 md:px-20 mt-5">
      <Tweet />
      <Form />
      <Comment />
      <Comment />
    </div>
  );
}

function Form() {
  return (
    <>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-lg font-bold text-head dark:text-darkhead font-Konkhmer tracking-wider">
          Comments (20)
        </h2>
      </div>
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 h-10 resize-none w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-500  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-text  dark:bg-gray-800  dark:border-gray-600 dark:hover:text-darktext dark:hover:bg-gray-700"
        >
          Post
        </button>
      </form>
    </>
  );
}

export default PostPage;
