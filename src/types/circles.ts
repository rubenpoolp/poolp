export type Participant = {
  id: string;
  avatar?: string;
  name: string;
};

export type PastCircle = {
  id: string;
  name: string;
  formattedDate: string;
  littleFormattedDate: string;
  participants: Participant[];
};
