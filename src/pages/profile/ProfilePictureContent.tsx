import useAddProfilePic from "@api/profilePics/addProfilePics.hook";
import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import MyText from "@components/natives/MyText";
import ProfilePictureItem from "@components/ProfilePictureItem";
import colors from "@config/colors";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import { PROFILE_PICS_BUCKET } from "@supabase_types";
import { supabase } from "@utils/supabase";
import upload from "@utils/upload";
import * as Crypto from "expo-crypto";
import { ArrowBendDownRight } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const ProfilePictureContent = ({title}: {title: string}) => {
  const { t } = useTranslation();

  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);
  const addProfilePic = useAddProfilePic();
  const { data: profilePics } = useGetProfilePics();
  const { setIsLoading } = useIsLoading();

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
      await addProfilePic.mutateAsync({
        urls: newPictures,
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
      <MyText className="text-3xl font-semibold mb-5">
        {title}
      </MyText>
  
      <View className="relative space-y-4 w-full items-center">
        <View className="absolute top-10 left-0 items-end">
          <MyText
            className="text-gray-500 text-left"
            style={{ maxWidth: 120 }}
          >
            {t("profile.principalPicture")}
          </MyText>
          <ArrowBendDownRight
            size={32}
            color={colors.gray[500]}
            style={{ transform: [{ rotate: "-25deg" }], marginRight: -15 }}
          />
        </View>
        <ProfilePictureItem
          onAdd={onAdd}
          onDelete={onDelete}
          picture={pictures[0]}
        />
        <View className="flex-row w-full justify-evenly">
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
          </View>
        </View>
  )
}

export default ProfilePictureContent;