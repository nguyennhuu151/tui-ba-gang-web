import { Spinner } from "@/components/ui/Spinner";
import { getI18n } from "@/lib/i18n/server";

export default async function LoadingRoomList() {
  const { dict } = await getI18n();
  return <Spinner label={dict.roomsPage.loading} />;
}
