﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using NashvilleTheatre.Models;

namespace NashvilleTheatre.DataAccess
{
    public class LineItemRepository
    {
        string ConnectionString;
        public LineItemRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NashvilleTheatre");
        }

        public LineItem GetALineItem(int id)
        {
            var sql = "SELECT * FROM LineItem WHERE LineItemId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var lineItem = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return lineItem;
            }
        }

        public LineItem UpdateQuantity (int id, int quantity)
        {
            var sql = "UPDATE LineItem SET Quantity = @quantity WHERE LineItemId = @id;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id, Quantity = quantity };
                var lineItem = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return lineItem;
            }
        }

        public int DeleteLineItem(int id)
        {
            var sql = "DELETE FROM LineItem WHERE LineItemId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var result = db.Execute(sql, parameters);
                return result;
            }
        }

        public List<LineItem> GetLineItemsByCartId(int id)
        {
            var sql = @"SELECT CartId, LineItemId, LineItemType, ProductId, Quantity, DateAdded
                        FROM LineItem
                        JOIN LineItemType ON LineItemType.LineItemTypeId = LineItem.LineItemTypeId
                        WHERE[CartId] = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var result = db.Query<LineItem>(sql, parameters).ToList();
                return result;
            }
        }

        public ShowLineItem GetShowLineItem(int id)
        {
            var sql = @"SELECT ShowName AS ItemName, ShowDateTime, ShowCost AS ItemPrice, LineItemId, Quantity, TheatreCompanyName,ShowImageUrl,VenueName, CreditCost
                        FROM ShowDateTime
                        JOIN Show ON Show.ShowId = ShowDateTime.ShowId
                        JOIN LineItem ON LineItem.ProductId = ShowDateTime.ShowDateTimeId
                        JOIN TheatreCompany ON TheatreCompany.TheatreCoId = Show.TheatreCoId
                        JOIN Venue ON Venue.VenueId = Show.VenueId
                        WHERE ShowDateTimeId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var lineItem = db.QueryFirst <ShowLineItem> (sql, parameters);
                return lineItem;
            }
        }

        public SubscriptionLineItem GetSubscriptionLineItem(int id)
        {
            var sql = @"SELECT SubscriptionName AS ItemName, Price AS ItemPrice, LineItemId, Quantity
                        FROM Subscription
                        JOIN LineItem ON LineItem.ProductId = Subscription.SubscriptionId
                        WHERE SubscriptionId = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };
                var lineItem = db.QueryFirst <SubscriptionLineItem> (sql, parameters); ;
                return lineItem;
            }
        }

        public LineItem AddALineItem(AddLineItem newLineItem)
        {
            var sql = @"INSERT INTO LineItem (CartId,LineItemTypeId,ProductId,Quantity)
                        VALUES (@CartId, @LineItemTypeId, @ProductId, @Quantity)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    newLineItem.CartId,
                    newLineItem.LineItemTypeId,
                    newLineItem.ProductId,
                    newLineItem.Quantity,
                };

                var result = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return result;
            }
        }
    }
}
