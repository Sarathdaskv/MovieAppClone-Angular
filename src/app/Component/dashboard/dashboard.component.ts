import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovies: any;
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  upcomingMovies!: Movie;
  originals!: Movie;

  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.getLatestMovies();
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getUpcomingMovies();
    this.getOriginals();
  }

  getLatestMovies() {
    this.dataService.getLatestMovies().subscribe(data => {
      this.latestMovies = this.changeData(data);
      console.log("gerg",this.latestMovies);
      
    }, err => {
      console.log("something went wrong in fetching latest movies");

    })
  }
  
  changeData(res: any): any {
    if(!res.backdrop_path){
      res.backdrop_path='https://image.tmdb.org/t/p/original' + res.poster_path + '?api_key=' + environment.api_key;
    }else{
      res.backdrop_path='https://image.tmdb.org/t/p/original' + res.backdrop_path + '?api_key=' + environment.api_key;
    }
    return res;
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(data => {
      this.popularMovies = this.modifyData(data);
      console.log("fa",this.popularMovies);
      
    }, err => {
      console.log("something went wrong in fetching popular movies");

    })
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(data => {
      this.nowPlayingMovies = this.modifyData(data);
    }, err => {
      console.log("something went wrong in fetching now playing movies");

    })
  }
  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(data => {
      this.upcomingMovies = this.modifyData(data);
    }, err => {
      console.log("something went wrong in fetching upcoming movies");

    })
  }
  getOriginals() {
    this.dataService.getOriginals().subscribe(data => {
      this.originals = this.modifyData(data);
      console.log("fegrewg",this.originals);
      
    }, err => {
      console.log("something went wrong in fetching originals ");

    })
  }

  modifyData(movie: Movie): Movie {
    if (movie.results) {
      movie.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;
        if(!element.title){
          element.title=element?.name;
        }
      });
    }
    return movie;
  }
}

