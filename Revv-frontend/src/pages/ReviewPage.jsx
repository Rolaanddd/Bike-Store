import Nav from "../components/Nav";
import { useState } from "react";
import PostButton from "../components/PostButton";
import { useEffect } from "react";
import Reviews from "../components/Reviews";
import { toast } from "react-toastify";

export default function ReviewPage() {
  const [email, setEmail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const response = await fetch("http://localhost:3000/review");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  async function handleclick(e) {
    e.preventDefault();
    if (review === "") {
      toast.error("Please enter your feedback before posting.");
      return;
    } else {
      toast.success("Feedback posted successfully");
      const response = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          review,
        }),
      });
      await response.json();
      setReview("");
    }
  }
  return (
    <div>
      <Nav />
      <div className="bg-cream minscreen-91 p-3 pl-4 grid grid-cols-5 ">
        <div className="col-span-3  gap-3 grid  justify-center items-centre  grid-cols-3">
          {reviews.map((item, index) => (
            <div key={index}>
              <Reviews email={item.email} review={item.review} />
            </div>
          ))}
        </div>

        <div className="col-span-2 sticky h top-23 ml-5 flex justify-center items-center">
          <form className="custom-shadow shadow-amber-100 grid grid-rows-12 grid-cols-1 justify-center h-9/10 w-4/5 p-9 pb-7">
            <h1 className="text-4xl row-span-1 text-center font-mono font-black underline">
              Post your Feedback
            </h1>
            <div className="row-span-9 flex justify-center items-center">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Drop your feedback here..."
                className="resize-none rounded-lg tracking-wider leading-relaxed font-bold h-9/11 border-2 focus:outline-none  w-6/7  p-3"
              />
            </div>
            <div className="row-span-2 flex justify-center items-center">
              <div onClick={(e) => handleclick(e)} className="fit-content">
                <PostButton />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
