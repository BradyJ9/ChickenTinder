using System.Collections.Concurrent;

namespace ChickenTinder.Logic.RoomCodeLogic
{
    public class RoomCodeLogic : IRoomCodeLogic
    {
        private const int RoomCodeLength = 4;

        private ConcurrentDictionary<string, byte> RoomCodesInUse = new ConcurrentDictionary<string, byte>();

        public string GetNewRoomCode()
        {
            var code = GenerateRandomCode();
            while (RoomCodesInUse.TryGetValue(code, out _)) //code is in use already
            {
                code = GenerateRandomCode();
            }
            RoomCodesInUse.TryAdd(code, 1);

            return code;
        }

        public bool AbandonRoomCode(string roomCode)
        {
            return RoomCodesInUse.TryRemove(roomCode, out _);
        }

        public bool CheckIfRoomExistsAndActive(string roomCode)
        {
            return RoomCodesInUse.TryGetValue(roomCode, out _);
        }

        private static string GenerateRandomCode()
        {
            const string chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, RoomCodeLength)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
