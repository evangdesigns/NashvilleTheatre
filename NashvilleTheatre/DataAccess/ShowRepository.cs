﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using NashvilleTheatre.Models;
using System.Data.SqlClient;

namespace NashvilleTheatre.DataAccess
{
    public class ShowRepository
    {
        string ConnectionString;
        public ShowRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NashvilleTheatre");
        }

        public List<Show> GetAllShows()
        {
            var sql = @"select * from show";

            using (var db = new SqlConnection(ConnectionString))
            {
                var shows = db.Query<Show>(sql).ToList();
                return shows;
            }
        }

        public CompleteShowInfo GetShowById(int showId)
        {
            var sql = @"SELECT Show.*, TheatreCompany.TheatreCompanyName, Category.CategoryName, Venue.*
                        FROM Show
                        JOIN TheatreCompany ON TheatreCompany.TheatreCoId = Show.TheatreCoId
                        JOIN category ON category.CategoryId = Show.CategoryId
                        JOIN Venue ON Venue.VenueId = Show.VenueId
                        WHERE Show.ShowId = @showId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { showId = showId };

                var show = db.QueryFirstOrDefault<CompleteShowInfo>(sql, parameters);
                return show;
            }
        }

        public List<Show> GetShowsByTheatreCo(int theatreCompanyId)
        {

            var sql = @"
                        select * from Show
                        join TheatreCompany on Show.TheatreCoId = TheatreCompany.TheatreCoId
                        join ShowDateTime on Show.ShowId = ShowDateTime.ShowId
	                        where Show.TheatreCoId = @TheatreCompanyId
                        order by ShowDateTime";

            var parameters = new
            {
                TheatreCompanyId = theatreCompanyId
            };

            using (var db = new SqlConnection(ConnectionString))
            {
                var showsByTheatreCo = db.Query<Show>(sql, parameters).ToList();
                return showsByTheatreCo;
            }
        }

        public List<ShowDate> GetAllShowDateTimesByShowId(int id)
        {
            var sql = "SELECT * FROM ShowDateTime WHERE ShowId = @id AND showdatetime > getdate()";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var shows = db.Query<ShowDate>(sql, parameters).ToList();
                return shows;
            }
        }

        public IEnumerable<ShowWithDateAndVenueName> GetAllShowsWithMostRecentDate()
        {
            var sql = @"select show.ShowId, show.ShowName, show.showImageUrl,
                        show.VenueId, Venue.VenueName, show.TheatreCoId, TheatreCompany.TheatreCompanyName,
                        (select min(showdatetime.showdatetime) 
                        from showdatetime where showdatetime.showid = show.showid and showdatetime > getdate())
                        AS 'ShowDateTime'
                        from show
                        join showdatetime sdt
                        on sdt.showid = show.showid
                        join Venue
                        on venue.VenueId = show.VenueId
                        join TheatreCompany
                        on TheatreCompany.TheatreCoId = Show.TheatreCoId
                        group by show.ShowId, Show.TheatreCoId, show.VenueId, 
                        venue.venueName, ShowName, ShowImageUrl, TheatreCompanyName";

            using (var db = new SqlConnection(ConnectionString))
            {
                var showsWithDate = db.Query<ShowWithDateAndVenueName>(sql);
                return showsWithDate;
            }
        }

        //SEARCH
        public List<Show> SearchShows(string searchTerm)
        {
            var sql = @"SELECT * FROM Show
                        WHERE ShowName LIKE @SearchTerm
                        OR Synopsis LIKE @SearchTerm
                        ";

            var parameters = new { SearchTerm = "%"+searchTerm+"%" };

            using (var db = new SqlConnection(ConnectionString))
            {
                var searchResults = db.Query<Show>(sql, parameters).ToList();
                return searchResults;
            }
        }

    }
}