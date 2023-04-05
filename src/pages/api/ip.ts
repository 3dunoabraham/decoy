export default async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("ipAddress", ipAddress)
    res.status(200).json({ IPv4: ipAddress });
  };
  