from flask_socketio import SocketIO,emit,join_room,leave_room
# from app.model import Message
# if env=='production' default what render url is
socket=SocketIO(cors_allowed_origins="*")

@socket.on("chat")
def handle_my_chat(data):
    print(data,"we are in the chat")
    # message=data["message"]
    # Message(message=message)
    room=data["room"]
    msg=data["message"]
    user=data["user"]["first_name"]
    new_data={
        "user":user,
        "msg":msg
    }
    print("!!!!!!!!!!!!!!!!!!!!!",room)
    emit("chat",new_data,broadcast=True,to=room)

@socket.on("leave")
def exit_room(data):
    print("we are in the leave")
    room=data["room"]
    user=data["user"]["first_name"]
    leave_room(room)
    msg=f"{user} left the room"
    new_data={"msg":msg}
    emit("leave",new_data,broadcast=True)

@socket.on("join")
def on_join(data):
    print(data)
    user=data["user"]["first_name"]
    msg=f"{user} has joined the room"
    new_data={
        "user":"Global Notification",
        "msg":msg
    }
    join_room(data["room"])
    emit("join",new_data,broadcast=True)
