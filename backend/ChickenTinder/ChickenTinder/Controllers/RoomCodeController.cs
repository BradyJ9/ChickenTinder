using ChickenTinder.Logic.RoomCodeLogic;
using Microsoft.AspNetCore.Mvc;

namespace ChickenTinder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomCodeController(IRoomCodeLogic roomCodeLogic, ILogger<RoomCodeController> logger) : ControllerBase
    {
        private readonly ILogger<RoomCodeController> _logger = logger;

        [HttpGet(Name = "RoomCode")]
        public IActionResult GenerateRoomCode()
        {
            var roomCode = roomCodeLogic.GetNewRoomCode();
            return Ok(new { roomCode });
        }

        [HttpDelete(Name = "RoomCode")]
        public IActionResult AbandonRoomCode(string roomCode)
        {
            var abandoned = roomCodeLogic.AbandonRoomCode(roomCode);
            if (!abandoned)
            {
                return StatusCode(404, $"RoomCode {roomCode} was not found");
            }
            return Ok();
        }

        [HttpGet("{roomCode}", Name = "RoomCodeCheck")]
        public IActionResult CheckRoomCode(string roomCode)
        {
            var roomExists = roomCodeLogic.CheckIfRoomExistsAndActive(roomCode);
            if (!roomExists)
            {
                return StatusCode(404);
            }
            return Ok(new { roomCode });
        }
    }
}
