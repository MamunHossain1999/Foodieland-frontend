import { Facebook, Instagram, Twitter } from "lucide-react";
import { useParams } from "react-router";
import { useGetAllArticlesQuery } from "../Blog/blogApi";
import cookieImg from "@/assets/bookpostImg/a18924703d3ad37c1b04115b9d86b67b82023a90.png";
import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import RelativeProductPage from "@/component/RelativeProductPage/RelativeProductPage";
import "aos/dist/aos.css";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { data: articles, isLoading, isError } = useGetAllArticlesQuery();


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Product not found</div>;

  const article = articles?.find((ar) => String(ar.id) === id);

  return (
    <>
      <section className="container mx-auto py-10 px-4 lg:px-0">
        {/* Title */}
        <h1
          className="text-3xl text-center md:text-4xl font-bold mb-3"
          data-aos="fade-down"
        >
          {article?.title || "Blog Post Title"}
        </h1>

        {/* Author & Date */}
        <div
          className="flex items-center justify-center space-x-3 text-gray-600 mb-6"
          data-aos="fade-up"
        >
          <img
            src="/author.jpg"
            alt="Author"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">John Smith</p>
            <p className="text-sm">15 March 2022</p>
          </div>
        </div>

        {/* Intro */}
        <p
          className="text-gray-700 mb-6 text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu
          risus id massa dapibus, sit amet gravida ligula.
        </p>

        {/* Main Image */}
        <img
          src={article?.image}
          alt={article?.title}
          className="w-full rounded-xl mb-10 h-[654px]"
          data-aos="zoom-in"
        />

        {/* Sections */}
        <div className="space-y-8">
          <div data-aos="fade-right">
            <h2 className="text-xl font-bold mb-2">
              How did you start out in the food industry?
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eu risus id massa dapibus, sit amet gravida ligula.
            </p>
          </div>

          <div data-aos="fade-left">
            <h2 className="text-xl font-bold mb-2">
              What do you like most about your job?
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eu risus id massa dapibus, sit amet gravida ligula.
            </p>
          </div>

          <div data-aos="fade-right">
            <h2 className="text-xl font-bold mb-2">
              Do you cook at home on your days off?
            </h2>
            <img
              src={cookieImg}
              alt="Cooking at home"
              className="w-full rounded-xl mb-3 h-[500px]"
            />
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eu risus id massa dapibus, sit amet gravida ligula.
            </p>
          </div>

          <div data-aos="fade-left">
            <h2 className="text-xl font-bold mb-2">
              What would your advice be to young people looking to get their
              foot in the door?
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eu risus id massa dapibus, sit amet gravida ligula.
            </p>
          </div>

          <blockquote
            className="italic text-xl font-medium text-gray-900 border-l-4 border-gray-300 pl-4"
            data-aos="fade-up"
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ac ultrices odio."
          </blockquote>

          <div data-aos="fade-right">
            <h2 className="text-xl font-semibold mb-2">
              What is the biggest misconception that people have about being a
              professional chef?
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eu risus id massa dapibus, sit amet gravida ligula.
            </p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex space-x-3 mt-10" data-aos="fade-up" data-aos-delay="100">
          <a
            href="#"
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Facebook className="text-gray-600" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Twitter className="text-gray-600" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Instagram className="text-gray-600" />
          </a>
        </div>
      </section>

      <div>
        <NewsLetterPage />
      </div>

      <div className="mt-24 px-4 lg:px-0" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center ">
          Check out the delicious recipe
        </h2>
        <RelativeProductPage />
      </div>
    </>
  );
}
