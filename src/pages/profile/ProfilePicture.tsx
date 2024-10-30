import assets from "@assets/index";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import ProfilePictureItem from "@components/ProfilePictureItem";
import { useAuth } from "@context/Auth";
import { supabase } from "@utils/supabase";
import upload from "@utils/upload";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface ProfilePictureProps {}

const ProfilePicture = ({}: ProfilePictureProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [pictures, setPictures] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    const publicUrl = supabase.storage
      .from("profilePics")
      .getPublicUrl(user?.id).data.publicUrl;
    const urls = [1, 2, 3].map((index) => {
      const url = `${publicUrl}/${index}.jpg`;
      return url;
    });
    setPictures(urls);
  }, []);

  const onAdd = async (uri: string) => {
    await upload(`${user?.id}/${pictures.length + 1}.jpg`, uri);

    const { data: newList } = await supabase.storage.from("profilePics").list();
    setPictures(newList?.map((item) => item.name) || []);
  };

  console.log("pictures", pictures);
  return (
    <MyScreen padding>
      <MyHeader canGoBack>
        <MyImage img={assets.logoCropped} containerStyle="h-10 w-20" />
      </MyHeader>

      <View className="flex-1 w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("profile.editPictures")}
        </MyText>

        <View className=" space-y-4 w-full items-center">
          <ProfilePictureItem onAdd={onAdd} picture={pictures[0]} />
          <View className="flex-row w-full justify-evenly">
            <ProfilePictureItem onAdd={onAdd} picture={pictures[1]} />
            <ProfilePictureItem onAdd={onAdd} picture={pictures[2]} />
          </View>
        </View>
      </View>
    </MyScreen>
  );
};

export default ProfilePicture;
