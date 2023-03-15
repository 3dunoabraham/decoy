import fakeData from "@/scripts/constants/users.json";

export default function handler(req, res) {
  res.status(200).json(fakeData);
}