import * as FileSystem from "expo-file-system";
import { supabase } from "./supabase";

const upload = async (path: string, uri: string) => {
  try {
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("File doesn't exist");
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to Uint8Array
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log("URI", uri);
    console.log("File size:", bytes.length);

    // Upload the binary data
    const { data, error } = await supabase.storage
      .from("profilePics")
      .upload(path, bytes, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    console.log("Upload successful:", data);
  } catch (err) {
    console.error("Error processing image:", err);
  }
};

export default upload;
