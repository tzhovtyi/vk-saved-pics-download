# VK Saved Pics Download

This Node.js script enables you to download all saved photos from VK at once

## Prerequisites

Before running the script, ensure you have the following:

- **Node.js** (version 20 or higher)
- A valid **VK API token**

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/vk-photo-album-downloader.git
   cd vk-photo-album-downloader
   ```

2. **Install dependencies**:

   Make sure all the required Node.js packages are installed:

   ```bash
   npm install
   ```

3. **Configure the script**:

   Open `index.js` and insert your VK API token. Modify the download path if needed.

   ```javascript
   const apiToken = "YOUR_VK_API_TOKEN";
   const downloadPath = "./downloads";
   ```

## Usage

1. Run the script:

   ```bash
   npm install
   node index
   ```

2. The script will begin downloading all your saved photo albums to the specified download path.

## Node.js Version

This script requires **Node.js version 20+**.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
