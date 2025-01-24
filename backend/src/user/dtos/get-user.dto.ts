export class GetUserDto {
  id: string;
  name: string;
  email: string;
  preferredLanguage?: string;
  preferredGenres?: string[];
  location?: string;
  gender?: string;
  acceptsRecommendations?: boolean;
  createdAt: Date;
}
