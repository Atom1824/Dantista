export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzBXsYoTmRJzsLeoawoNXFPM1VDfp-P14aXTzfJr56LoDMKOd8I6nwtYnqD3gtr6YIZRg/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ result: "error", message: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
