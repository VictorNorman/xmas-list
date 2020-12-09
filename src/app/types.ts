

export interface UserInfo {
  uid: string;
  email: string;
  userName: string;   // globally unique in the system.
  photoURL?: string;     // an image.
  groups?: string[];   // array of firebase unique ID
}

// A group of users, who are sharing Xmas lists.
export interface Group {
  owner: string;    // username of person who created the group and will permit others to join.
  id: number;       // unique cloud firestore id
  name: string;     // name of the group, e.g., "Norman family"
  users: string[];  // usernames
}

// A gift in a person's list (indicated by userId)
export interface Gift {
  giftid?: string;        // optional while being created
  uid: string;            // userid of the person the gift is for.
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
  uid: string;          // who made the comment.
  message: string;
  timestamp: any;       // a firebase timestamp, actually.
}

/**
 * pages:
 *
 * login: get user info for login; create account; reset password;
 *   --> new group creation?  Add yourself to a group?
 * home: show group(s); show users in that group; click on user to go to gift-list
 *    (including your own)
 * gift-list: show user and list of gifts.  Add/delete/edit gift (for yourself);
 *    add gift for someone else; claim gift;
 * gift-detail: show gift and comments about the gift.  Add comment; claim;
 *   delete own comment;
 */
