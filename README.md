# VK Saved Pics Download

This Node.js script enables you to download all saved photos from VK at once

## Prerequisites

Before running the script, ensure you have the following:

- **Node.js** (version 20 or higher)
- A valid **VK API token**

## Setup

**Clone the repository**:

```bash
git clone https://github.com/tzhovtyi/vk-saved-pics-download.git
cd vk-saved-pics-download
```

**Configure the script**:
Open `index.js` and insert your VK API token. Modify the download path if needed.

```javascript
const apiToken = "YOUR_VK_API_TOKEN";
const downloadPath = "./downloads";
```

**Run the script:**

```bash
npm install
node index
```

## Node.js Version

This script requires **Node.js version 20+**.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
