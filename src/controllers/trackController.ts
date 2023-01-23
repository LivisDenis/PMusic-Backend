import { Album, Track, TrackAttributes } from '../models/models.js';
import { NextFunction, Request, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}
interface TrackAttributesTest {
  id: number;
  albumId: number;
  trackName: string;
  descriptionTrack: string;
  production: string;
  trackText: string;
  trackPath: string;
}
export class TrackController {
  async create(req: TypedRequestBody<any>, res: Response, next: NextFunction) {
    try {
      const {album: albumItem, tracks} = req.body

      const album = await Album.create({
        ...req.body.album,
      });

      const createdTracks = await Track.bulkCreate(tracks.map((track: TrackAttributesTest) => ({
        trackName: track.trackName,
        descriptionTrack: track.descriptionTrack,
        production: track.production,
        trackText: track.trackText,
        trackPath: track.trackPath,
        albumId: album.id
      })))

      res.json(createdTracks);
    } catch (e) {
      next(e);
    }
  }

  async getAll() {}

  async getOne() {}
}
