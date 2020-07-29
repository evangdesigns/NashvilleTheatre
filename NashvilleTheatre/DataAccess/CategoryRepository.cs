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

        public CategorySummary GetSummaryByCategory(string category)
        {
            var sql = @"with category_view as(
                        select top(3) ShowName, CategoryName 
                        from Show as sh
                        join Category as c on sh.CategoryId = c.CategoryId
                        where CategoryName = @Category
                        order by ShowName
                        ), ShowList as(
                        select
                           distinct  
                            stuff((
                                select ', ' + cv.ShowName
                                from category_view cv
                                where cv.ShowName = ShowName
                                order by cv.ShowName
                                for xml path('')
                            ),1,2,'') as ShowList
                        from category_view 
                        group by ShowName
                        ), CategorySummary as(
                        select CategoryName, count(*) as CategoryTotal from Category as c
                        join Show as sh on sh.CategoryId = c.CategoryId
                        where CategoryName = @Category
                        group by CategoryName
                        )
                        select * from CategorySummary, ShowList";

            var parameters = new
            {
                Category = category
            };

            using (var db = new SqlConnection(ConnectionString))
            {
                var summary = db.QueryFirstOrDefault<CategorySummary>(sql, parameters);
                return summary;
            }
        }

        public CategorySummary GetCategorySummariesNew(string category)
        {
            var categoryCountSql = @"Select count(*)  
                        from Show as sh
                        join Category as c on sh.CategoryId = c.CategoryId
                        where CategoryName = @Category";

            var showSql = @"select top(3) ShowId, ShowName  
                        from Show as sh
                        join Category as c on sh.CategoryId = c.CategoryId
                        where CategoryName = @Category
                        order by ShowName";

            var parameters = new { Category = category };

            using (var db = new SqlConnection(ConnectionString))
            {
                var shows = db.Query<ShowNameOnly>(showSql, parameters);
                var categoryCount = db.QueryFirstOrDefault<int>(categoryCountSql, parameters);

                var categorySummary = new CategorySummary
                {
                    CategoryName = category,
                    CategoryTotal = categoryCount,
                    ShowList = shows.ToList()
                };

                return categorySummary;
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
            var sql = @"select * from Category
                        where CategoryName in ('Comedy', 'Tragedy', 'Drama', 'Musical')";

            using (var db = new SqlConnection(ConnectionString))
            {
                var categories = db.Query<Category>(sql).ToList();
                return categories;
            }
        }

    }
}
