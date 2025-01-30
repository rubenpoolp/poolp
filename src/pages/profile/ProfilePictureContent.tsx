import useAddProfilePic from "@api/profilePics/addProfilePics.hook";
import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import MyText from "@components/natives/MyText";
import ProfilePictureItem from "@components/ProfilePictureItem";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import { PROFILE_PICS_BUCKET } from "@supabase_types";
import { supabase } from "@utils/supabase";
import upload from "@utils/upload";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

const ProfilePictureContent = ({
  title,
  minPictures,
  setIsPicturesValid,
}: {
  title: string;
  minPictures?: number;
  setIsPicturesValid?: (value: boolean) => void;
}) => {
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);
  const addProfilePic = useAddProfilePic();
  const { data: profilePics } = useGetProfilePics();
  const { setIsLoading } = useIsLoading();

  useEffect(() => {
    if (!minPictures || !setIsPicturesValid) return;
    setIsPicturesValid(pictures.length >= minPictures);
  }, [minPictures, pictures, setIsPicturesValid]);

  const onAdd = async (uri: string) => {
    try {
      setIsLoading(true);
      const UUID = Crypto.randomUUID();
      const url = `${user?.id}/${UUID}.jpg`;
      const { data, error } = await upload(url, uri, PROFILE_PICS_BUCKET);
      if (error) {
        throw error;
      }
      if (!data?.path) throw new Error("No path returned from upload");

      const newPictures = [...pictures, data?.path];
      await addProfilePic.mutateAsync({ urls: newPictures });
      setPictures(newPictures);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while adding your picture, please retry",
      );
      console.warn("error on Add", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (url: string) => {
    try {
      setIsLoading(true);
      await supabase.storage.from(PROFILE_PICS_BUCKET).remove([url]);
      const newPictures = pictures.filter((p) => p !== url);

      await addProfilePic
        .mutateAsync({
          urls: newPictures,
        })
        .catch((error) => {
          console.warn("error on Delete", error);
        });
      setPictures(newPictures);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while deleting your picture, please retry",
      );
      console.warn("error on Delete", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPictures(profilePics || []);
  }, [profilePics]);

  return (
    <View className="flex-1 w-full" style={{ gap: 80 }}>
      <View className="mb-3">
        <MyText className="text-3xl font-semibold mb-2">{title}</MyText>
        {minPictures && (
          <MyText className="text-gray-500 text-[13px] font-light">
            {`Add at least ${minPictures} pictures (to help people recognize you)`}
          </MyText>
        )}
      </View>

      <View className="relative space-y-10 w-full items-center">
        <View className="flex-row">
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[0]}
          />
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[1]}
          />
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[2]}
          />
        </View>
        <View className="flex-row">
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[3]}
          />
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[4]}
          />
          <ProfilePictureItem
            onAdd={onAdd}
            onDelete={onDelete}
            picture={pictures[5]}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfilePictureContent;
