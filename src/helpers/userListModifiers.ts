/**
 * Rearranges a user list so the current user appears first,
 * then splits into main (first 5) and extra users.
 */

export interface User {
    readonly handle: string;
    [key: string]: unknown;
}

export interface RearrangedUsers {
    mainUsers: User[];
    extraUsers: User[];
}

export const rearrangeUser = (
    userList: User[],
    currentUser: string
): RearrangedUsers => {
    const mainUsers: User[] = [];

    userList.forEach((user: User) => {
        if (user.handle === currentUser) {
            mainUsers.unshift(user);
        } else {
            mainUsers.push(user);
        }
    });

    const extraUsers = mainUsers.splice(5);

    return { mainUsers, extraUsers };
};
