export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbwjRxInpkiXlwYORbx3Fou7sS_tMPSDLTAoLEDl9obOsZCSLCceuFGJl752Lr1sPoTjXg/exec/exec", {
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
