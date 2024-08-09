import { format, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate(date: Date, options?: string): string {
    setDefaultOptions({ locale: fr });
    return format(date, options || "yyyy-MM-dd");
}
