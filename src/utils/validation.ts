const t = (key: string, other?: any) => key;

export const nameChecker = (name: string, field_name = t("fields.default")) => {
  if (!name) {
    return t("errors.cannotBeEmpty", { x: field_name });
  }
  if (name.length < 2) {
    return t("errors.tooShort", { x: field_name });
  }
  if (name.length > 50) {
    return t("errors.tooLong", { x: field_name });
  }
  const regex = /^[^.,?!^:;/$&(){}@€*<>§+=£¥%_"#°0-9[\]\\]{2,50}$/;
  if (!regex.test(name)) {
    return t("errors.wrongFormat", { x: field_name });
  }
};

export const emailChecker = (email: string) => {
  if (!email) {
    return "L'email ne peut pas être vide.";
  }
  if (email.length > 100) {
    return "L'email est trop long.";
  }
  const regex = /^[\w\-.]+(\+\w+)?@([\w-]+\.)+[\w-]{2,}$/;
  if (!regex.test(email)) {
    return "L'email ne semble pas être au bon format.";
  }
};

export const passwordChecker = (password: string) => {
  if (!password) {
    return "Le mot de passe ne peut pas être vide.";
  }
  if (password.length < 6) {
    return "Le mot de passe est trop court.";
  }
  if (password.length > 100) {
    return "Le mot de passe est trop long.";
  }
};

export const phoneChecker = (phoneNumber: string, countryCode: CountryCode) => {
  const fieldName = t("fields.thePhoneNumber");
  const regexList = {
    FR: /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,
  };

  if (phoneNumber === "") return t("errors.cannotBeEmpty", { x: fieldName });

  if (phoneNumber.length > 30) {
    return t("errors.tooLong", { x: fieldName });
  }
  if (!regexList[countryCode].test(phoneNumber)) {
    return t("errors.wrongFormat", { x: fieldName });
  }
};

export const startEndDatechecker = (
  startDate: Date | null,
  endDate: Date | null,
  minDate: Date,
) => {
  if (!startDate) {
    return "La date de début ne peut être vide";
  }
  const today = new Date();
  const _endDate = endDate ?? today;

  if (startDate > today) {
    return "La date de début ne peut être dans le futur.";
  }

  if (startDate > _endDate) {
    return "La date de début ne peut être après la date de fin.";
  }

  if (startDate < minDate || _endDate < minDate) {
    return "Les dates sont trop anciennes.";
  }
};
