import { useAuth } from "@context/Auth";
import { Reports } from "@supabase_types";
import { useMutation } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import sendReport from "./sendReport.query";

const useSendReport = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["report"],
    mutationFn: async (reportForm: Partial<Reports>) => {
      if (!auth.user?.id) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }
      return sendReport({
        ...reportForm,
        from_user_id: auth.user.id,
      });
    },
  });
};

export default useSendReport;