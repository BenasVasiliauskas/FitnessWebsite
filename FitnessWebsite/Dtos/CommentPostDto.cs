using System.ComponentModel.DataAnnotations;

namespace FitnessWebsite.Dtos
{
    public class CommentPostDto
    {
        [Required]
        public string Body { get; set; }
    }
}
