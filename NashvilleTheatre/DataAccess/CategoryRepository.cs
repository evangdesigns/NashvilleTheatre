using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using NashvilleTheatre.Models;
using System.Data.SqlClient;

namespace NashvilleTheatre.DataAccess
{
    public class CategoryRepository
    {
        string ConnectionString;
        public CategoryRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NashvilleTheatre");
        }

        public List<Category> GetAllCategories()
        {
            var sql = "select * from Category";

            using (var db = new SqlConnection(ConnectionString))
            {
                var categories = db.Query<Category>(sql).ToList();
                return categories;
            }
        }

        public List<CompleteShowInfo> GetAllShowsByCategoryId(int categoryId)
        {
            var sql = @"select show.*, TheatreCompany.TheatreCompanyName, Category.CategoryName, Venue.*
                        from show join TheatreCompany on TheatreCompany.TheatreCoId = show.TheatreCoId
                        JOIN category on category.CategoryId = show.CategoryId
                        join Venue on Venue.VenueId = show.VenueId
                        where category.CategoryId = @categoryId
                        order by CategoryId";

            var showdatesSql = @"select category.*, ShowDateTime.ShowDateTime, showdatetime.showId
                                from category 
                                join show
                                on show.CategoryId = Category.CategoryId
                                join ShowDateTime
                                on ShowDateTime.showId = show.ShowId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { 
                    categoryId = categoryId,

                };
                var showsByCategory = db.Query<CompleteShowInfo>(sql, parameters);
                var showDates = db.Query<ShowsWithDates>(showdatesSql);
                List<CompleteShowInfo> showsWithMultipleDates = new List<CompleteShowInfo>();



                foreach (var show in showsByCategory)
                { 
                    var showsWithDates = new CompleteShowInfo
                    {
                        ShowId = show.ShowId,
                        TheatreCoId = show.TheatreCoId,
                        VenueId = show.VenueId,
                        ShowName = show.ShowName,
                        Synopsis = show.Synopsis,
                        ShowCost = show.ShowCost,
                        CategoryId = show.CategoryId,
                        ShowImageUrl = show.ShowImageUrl,
                        TheatreCompanyName = show.TheatreCompanyName,
                        CategoryName = show.CategoryName,
                        VenueName = show.VenueName,
                        StreetAddress = show.StreetAddress,
                        City = show.City,
                        State = show.State,
                        ZipCode = show.ZipCode,
                        Capacity = show.Capacity,
                        VenueImageUrl = show.VenueImageUrl,
                        Dates = showDates.Where(x => x.ShowId == show.ShowId).Select(x => x.ShowDateTime).ToList()
                    };
                    showsWithMultipleDates.Add(showsWithDates);
               
                     
                }
                return showsWithMultipleDates;
            }
        }

        public List<Category> GetTopCategories()
        {
            var sql = @"SELECT DISTINCT Category.CategoryId, CategoryName from Category 
                        JOIN Show ON Show.CategoryId = Category.CategoryId
                        WHERE Show.ShowId IS NOT NULL";

            using (var db = new SqlConnection(ConnectionString))
            {
                var categories = db.Query<Category>(sql).ToList();
                return categories;
            }
        }


        public List<TopCategory> GetTopCategoriesWithShows(int categoryId)
        {
            var sql = @"SELECT Category.CategoryId, CategoryName, ShowId, ShowName from Category 
                    JOIN Show ON Show.CategoryId = Category.CategoryId
                    WHERE Show.ShowId IS NOT NULL AND Category.CategoryId = @categoryId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    CategoryId = categoryId,

                };
                var categories = db.Query<TopCategory>(sql, parameters).ToList();
                return categories;
            }
        }

    }
}
