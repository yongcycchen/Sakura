namespace API.Helpers
{
    public class LikesParams : PaginationParam
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
    }
}