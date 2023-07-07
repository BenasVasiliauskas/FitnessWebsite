using AutoMapper;
using FitnessWebsite.Dtos;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using FitnessWebsite.Interfaces;
using System.Security.Claims;

namespace FitnessWebsite.Services
{
    public class CommentService : ICommentService
    {       
        private readonly IBaseRepository<Workout> _workoutRepository;
        private readonly IBaseRepository<Comment> _commentRepository;
        private readonly IMapper _mapper;

        public CommentService(IBaseRepository<Workout> workoutRepository, IBaseRepository<Comment> commentRepository, IMapper mapper)
        {
            _workoutRepository = workoutRepository;
            _commentRepository = commentRepository;
            _mapper = mapper;
        }


        public async Task<CommentViewDto> AddAsync(int workoutId, int exerciseId, CommentPostDto commentDto)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");

            var commentEntity = _mapper.Map<Comment>(commentDto);
            commentEntity.CreatedDate = DateTime.UtcNow;
            exercise.Comments.Add(commentEntity);
            await _commentRepository.AddAsync(commentEntity);

            return _mapper.Map<CommentViewDto>(commentEntity);

        }

        public async Task DeleteAsync(int workoutId, int exerciseId, int commentId, ClaimsPrincipal user)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            if (workout.ApplicationUserId != user.FindFirst("userId").Value && !user.IsInRole("Moderator"))
            {
                throw new ForbiddenException("You can only delete your comments");
            }

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");


            var comment = exercise.Comments.SingleOrDefault(c => c.Id == commentId)
                ?? throw new ForbiddenException("Comment with such an id doesnt exist");


            await _commentRepository.DeleteAsync(comment);

        }

        public async Task<List<CommentViewDto>> GetAllAsync(int workoutId, int exerciseId)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new EntityMissingInDatabaseException("Exercise with such an id doesnt exist");

            return _mapper.Map<List<CommentViewDto>>(exercise.Comments);
        }

        public async Task<CommentViewDto> GetByIdAsync(int workoutId, int exerciseId, int commentId)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new EntityMissingInDatabaseException("Exercise with such an id doesnt exist");

            var comment = exercise.Comments.SingleOrDefault(c => c.Id == commentId)
                ?? throw new EntityMissingInDatabaseException("Comment with such an id doesnt exist");

            return _mapper.Map<CommentViewDto>(comment);

        }

        public async Task UpdateAsync(int workoutId, int exerciseId, int commentId, ClaimsPrincipal user, CommentPostDto commentDto)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            if (workout.ApplicationUserId != user.FindFirst("userId").Value && !user.IsInRole("Moderator"))
            {
                throw new ForbiddenException("You can only update your comments");
            }

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");


            var comment = exercise.Comments.SingleOrDefault(c => c.Id == commentId)
                ?? throw new ForbiddenException("Comment with such an id doesnt exist");

            comment.UpdatedDate = DateTime.Now;
            comment.Body = commentDto.Body;

            await _commentRepository.UpdateAsync(comment);
        }
    }
}
