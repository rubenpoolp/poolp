import * as FileSystem from "expo-file-system";
import { supabase } from "./supabase";

const upload = async (path: string, uri: string, bucket: string) => {
  try {
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("File doesn't exist");
      return { data: null, error: "File doesn't exist" };
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

    // Upload the binary data
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      return { data: null, error };
    }

    return { data, error };
  } catch (error) {
    console.error("Error processing image:", error);
    return { data: null, error };
  }
};

export default upload;
