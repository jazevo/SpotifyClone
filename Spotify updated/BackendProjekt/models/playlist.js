const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const PlaylistSchema=new Schema({

    name:{                  //name der playlist, z.B. "chill, rock"
        type:String,
        required:true
    },
    songs:[String]          //filenamen der songs (=primary key)
});

var PlaylistModel=mongoose.model('Playlist',PlaylistSchema);

module.exports=PlaylistModel;