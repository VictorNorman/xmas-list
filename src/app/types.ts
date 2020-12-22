export type UserId = string;

export interface UserInfo {
  uid: UserId;
  email: string;
  userName: string;    // globally unique in the system.
  photoURL?: string;   // an image.
  groups?: string[];   // array of firebase unique ID
}

// A group of users, who are sharing Xmas lists.
export interface Group {
  id?: string;         // unique cloud firestore id. Not prvided on creation.
  adminUid: UserId;    // uid of admin user
  name: string;        // name of the group, e.g., "Norman family"
  users: UserId[];     // members' uids
}

// A gift in a person's list (indicated by userId)
export interface Gift {
  giftid?: string;        // optional while being created
  uid: UserId;            // userid of the person the gift is for.
  name: string;
  info: string;
  cost: number;           // estimated cost of gift.
  claimed: boolean;
  whoAdded: string;       // username of who added the gift to this person's list.
  url?: string;           // a link to where to see more info about the gift.
}


// Put the comments in the Gift???  Won't load them for one's own gifts.
export interface Comment {
  giftid: string;       // the comment is for this gift.
  uid: UserId;          // who made the comment.
  message: string;
  timestamp: any;       // a firebase timestamp, actually.
}

