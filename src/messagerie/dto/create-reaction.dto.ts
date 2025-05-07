export class CreateReactionDto {
  readonly type: string;
  readonly author: string;
  readonly messageId: number;
}
