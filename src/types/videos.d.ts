export interface Videos {
    videos: Video[];
}

export interface Video {
    slug:            string;
    title:           string;
    client:          string;
    date:            string;
    thumbnail:       string;
    image:           string;
    description_eng: string;
    description_esp: string;
}
