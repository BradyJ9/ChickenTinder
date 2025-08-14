using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class SessionHub : Hub
    {
        public async Task JoinSession(string roomCode)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        }

        public async Task AbandonSessionAsHost(string roomCode)
        {
            await NotifyUsersOfAbandonedSession(roomCode);
            await LeaveSession(roomCode);
        }

        public async Task NotifyUsersOfAbandonedSession(string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("SessionAbandoned");
        }

        public async Task LeaveSession(string roomCode)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomCode);
        }

        public async Task NotifyHostOfJoining(string name, string roomCode)
        {
            await Clients.Group(roomCode).SendAsync("UserJoined", name);
        }


    }
}
