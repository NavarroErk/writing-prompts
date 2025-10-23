//! Run with 'nodemon server.js'
//! Run with 'console-ninja nodemon server.js'

import express from "express";
import cors from "cors";
import { Filter } from "bad-words";
// import { array as baseList } from "badwords-list";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const filter = new Filter();

let userSubmissions = [
  {
    prompt: "Describe a world without music.",
    title: "Title 1",
    story:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione quibusdam quis. Eveniet sapiente, provident asperiores quis ex alias voluptas, quasi deleniti nobis quae totam et? Nesciunt nulla labore magnam et aliquid? Doloremque nihil accusantium deserunt, necessitatibus in inventore, voluptatum et obcaecati tempora incidunt officia neque voluptatem cum tempore iure?",
    genre: "Horror",
    username: "John Doe",
    anonymous: false,
    date: {
      year: 2025,
      month: 10,
      day: 11,
      hour: 2,
      minute: 47,
    },
  },
  {
    prompt: "Write a letter to your future self.",
    title: "Title 2",
    story:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo obcaecati dignissimos blanditiis eum velit, nam non temporibus modi sequi labore nesciunt aliquam at reiciendis ea dolores magnam enim beatae illum quis impedit eius sapiente distinctio magni necessitatibus! Quisquam odit tenetur deserunt eveniet eum, recusandae dolorum, dicta sed sit cupiditate ipsam autem aliquid ullam eius fuga facilis! Consectetur magni nisi quam!",
    genre: "Children",
    username: "Jane Doe",
    anonymous: true,
    date: {
      year: 2025,
      month: 4,
      day: 21,
      hour: 9,
      minute: 49,
    },
  },
  {
    prompt:
      "What would you do if time stopped for an hour everyday, only for you?",
    title: "Title 3",
    story:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla doloribus nostrum perspiciatis aliquam inventore ullam molestias recusandae assumenda quam sequi, unde error architecto, rem nisi ab optio modi quisquam maxime ex iusto aliquid laudantium et officiis. Iste tempora possimus ipsa error, ex dolorum explicabo!",
    genre: "Sci-Fi",
    username: "Example Username",
    anonymous: false,
    date: {
      year: 2025,
      month: 1,
      day: 29,
      hour: 11,
      minute: 22,
    },
  },
  {
    prompt:
      "What would you do if time stopped for an hour everyday, only for you?",
    title: "Title 3",
    story:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum, officia rem optio corrupti quisquam alias vitae sit, dolorum eos sapiente? Quo tempora accusantium nam temporibus ipsa cumque quod. Vero tempore, nobis omnis, magnam veritatis, odit amet ut magni numquam incidunt provident deleniti facilis repellendus suscipit commodi aliquid atque. Veniam, voluptas! Repellat voluptatem, assumenda placeat est adipisci officiis quo facere architecto dolore asperiores eum accusantium!",
    genre: "Sci-Fi",
    username: "Example Username",
    anonymous: false,
    date: {
      year: 2025,
      month: 1,
      day: 29,
      hour: 14,
      minute: 22,
    },
  },
];

function getDailyPrompt() {
  const dayIndex = new Date().getDate() % prompts.length;

  return prompts[dayIndex];
}

const prompts = [
  "Describe a world without music.",
  "What would you do if time stopped for an hour everyday, only for you?",
  "Write a letter to your future self.",
];

app.get("/api/prompt", (req, res) => {
  res.json(getDailyPrompt());
});

app.post("/api/submit-story", (req, res) => {
  console.log("Received: ", req.body);
  const prompt = req.body.prompt;
  const title = filter.clean(req.body.title);
  const story = filter.clean(req.body.story);
  const genre = req.body.genre;
  const anonymous = req.body.anonymous;
  const username = filter.clean(req.body.username);
  const date = req.body.date;

  console.log(prompt);
  console.log(title);
  console.log(story);

  if (title == "" || story == "" || genre.length == 0 || username == "") {
    console.log(userSubmissions.length);

    return res.status(400).json({ message: "error" });
  }

  // userSubmissions.push(req.body);

  // userSubmissions.forEach((element, key) => {});

  // console.log(filter.clean(userSubmissions));

  console.log(userSubmissions.length);
});

app.get("/api/community-library", (req, res) => {
  res.json(userSubmissions);
});

app.listen(port, () => {
  console.log("Server Listening on port:", port);
});
