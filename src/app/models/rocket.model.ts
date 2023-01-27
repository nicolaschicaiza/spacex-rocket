export interface Rocket {
    id: string;
    name: string;
    description: string;
    height: number;
    country: string;
    flickr_images: string[];
}

export interface CreateRocketDTO extends Rocket { }

export interface UpdateRocketDTO extends Partial<CreateRocketDTO> { }
