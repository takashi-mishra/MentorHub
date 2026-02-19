const crypto = require("crypto");


module.exports.generateZegoToken = ({ appId, serverSecret, userId }) => {
  const appID = parseInt(appId);
  const effectiveTimeInSeconds = 3600; // 1 hour
  
  // Create the payload
  const payload = {
    app_id: appID,
    user_id: userId,
    nonce: Math.floor(Math.random() * 2147483647),
    ctime: Math.floor(Date.now() / 1000),
    expire: Math.floor(Date.now() / 1000) + effectiveTimeInSeconds,
    payload: ""
  };

  // 1. Convert payload to JSON and then Base64
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

  // 2. Create Signature (HMAC-SHA256)
  const signature = crypto
    .createHmac("sha256", serverSecret)
    .update(base64Payload)
    .digest("hex");

  // 3. Construct the Token04 format which Prebuilt UI understands
  // Format: 04 + base64(payload) + base64(signature)
  const token = "04" + Buffer.from(JSON.stringify({
    ver: 1,
    hash: signature,
    data: base64Payload
  })).toString("base64");

  return token;
};