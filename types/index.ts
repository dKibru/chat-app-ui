
export type SlackUser = {
    id : string;
    pic : string;
    name : string;
}

export type ChatMessage = {
    id : string;
    body : string;
    user : SlackUser;
    sent_at : string;
    seen_at? : string;
}

export type Channel = {
    id: string;
    name : string;
    slug : string;
    img : string;
    messages : ChatMessage[]
}