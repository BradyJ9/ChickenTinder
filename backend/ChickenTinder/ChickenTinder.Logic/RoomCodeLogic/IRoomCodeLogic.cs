namespace ChickenTinder.Logic.RoomCodeLogic
{
    public interface IRoomCodeLogic
    {
        string GetNewRoomCode();
        bool AbandonRoomCode(string roomCode);
        bool CheckIfRoomExistsAndActive(string roomCode);
    }
}
