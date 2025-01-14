import { VK } from "vk-io";
import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";
import { format, fromUnixTime } from "date-fns";
import { ru } from "date-fns/locale";

// to get token: https://github.com/vkhost/vkhost.github.io
const TOKEN = "your token";

const DOWNLOAD_DIR = path.join(os.homedir(), "Desktop");

// bc of VK API constraint
const BATCH_SIZE = 1000;

const vk = new VK({
  token: TOKEN,
});

const timestanpToDate = (timestamp) => {
  const date = fromUnixTime(timestamp);
  return format(date, "d MMMM yyyy", { locale: ru });
};

const ensureDirectoryExists = async (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const fetchSavedPhotos = async (offset = 0, count = BATCH_SIZE) => {
  return vk.api.photos.get({
    album_id: "saved",
    count,
    offset,
    rev: 0,
  });
};

const downloadPhoto = async (url, filePath) => {
  try {
    const writer = fs.createWriteStream(filePath);
    const responseStream = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    responseStream.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`downloaded: ${filePath}`);
  } catch (error) {
    console.error(`failed to download: ${filePath}`, error);
  }
};

const downloadAllSavedPhotos = async () => {
  try {
    await ensureDirectoryExists(DOWNLOAD_DIR);

    const { count } = await vk.api.photos.get({
      album_id: "saved",
      count: 1,
    });

    let downloaded = 0;
    for (let offset = 0; offset < count; offset += BATCH_SIZE) {
      const response = await fetchSavedPhotos(offset);
      const photos = response.items;

      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const url = photo.orig_photo.url;
        const photoIndex = downloaded + 1;
        const filePath = path.join(
          DOWNLOAD_DIR,
          `${photoIndex} ${timestanpToDate(photo.date)}.jpg`
        );

        await downloadPhoto(url, filePath);

        downloaded++;
      }
    }

    console.log(`downloaded ${downloaded} photos successfully.`);
  } catch (error) {
    console.error("fatal: ", error);
  }
};

downloadAllSavedPhotos();
