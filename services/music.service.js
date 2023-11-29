import { faker } from "@faker-js/faker";

class musicService {
  constructor() {
    this.songs = [];
    this.create();
  }

 async create() {
    const lim = 100;

    for (let i = 0;i<=lim;i++) {
      this.songs.push({
        id:faker.string.uuid(),
        name:faker.music.songName(),
        genre:faker.music.genre(),
        realeaseDate:faker.date.anytime(),
        url:faker.image.url()
      });
    }
  }

 async find() {
    return this.songs;
  }

 async findOne(id) {
    return this.songs.find(el => el.id === id);
  }

 async delete(id) {
    const song = this.songs.find(el => el.id === id);
    const index = this.songs.indexOf(song);
    this.songs.splice(index,1);
    return song;
  }
}

export default musicService;
