using ERCL.Prueba.Application;
using ERCL.Prueba.Domain;
using ERCL.Prueba.Domain.Interfaces.Helper;
using ERCL.Prueba.Helpers;
using ERCL.Prueba.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

namespace ERCL.Prueba.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<CardService>();
            services.AddScoped<IGenericRepository<Card>, GenericRepository<Card>>();


            var fpConfig = new FileProcesorConfiguration();
            Configuration.Bind("FileProcesor", fpConfig);
            services.AddSingleton(fpConfig);


            services.AddSwaggerGen();
            services.AddDbContext<PruebaContext>(
                options => options
                    .UseSqlServer(Configuration.GetConnectionString("database"))
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors()
            );

            // CORS policy to communicate Angular app with WebApi project
            services.AddCors(options =>
            {
                options.AddPolicy("PublicPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint($"v1/swagger.json", "My API V1");
                });
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // CORS configuration
            app.UseCors("PublicPolicy");

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
