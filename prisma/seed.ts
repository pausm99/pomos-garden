import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //Create a User
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@example.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    if (!user) return;

    //Define Tasks
    const tasks = [
        {
            userId: user.id,
            title: "Complete user authentication module for the app",
            description:
                "Finalize and test the user authentication system to ensure that it handles various user scenarios securely and effectively.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "security",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "security",
                            color: "bg_red_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "feedback",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "feedback",
                            color: "bg_sky_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "legal",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "legal",
                            color: "bg_red_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "analytics",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "analytics",
                            color: "bg_orange_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "performance",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "performance",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Design new user profile page layout",
            description:
                "Create a new layout for the user profile page to improve user experience and visual appeal based on recent feedback.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "design",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "design",
                            color: "bg_orange_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "ux",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "ux",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Implement dark mode feature",
            description:
                "Add a dark mode option to the app settings to accommodate user preferences and improve usability in low-light conditions.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "feature",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "feature",
                            color: "bg_lime_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "usability",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "usability",
                            color: "bg_sky_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Update privacy policy document",
            description:
                "Revise and update the privacy policy to reflect recent changes in data protection laws and company practices.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "legal",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "legal",
                            color: "bg_indigo_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Add new payment gateway integration",
            description:
                "Integrate a new payment gateway to support additional payment methods and enhance the checkout process for users.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "payment",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "payment",
                            color: "bg_emerald_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Refactor user settings module",
            description:
                "Refactor the user settings module to improve performance and maintainability based on recent code reviews.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "refactor",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "refactor",
                            color: "bg_fuchsia_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "security",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "security",
                            color: "bg_red_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Create onboarding tutorial for new users",
            description:
                "Develop an onboarding tutorial to guide new users through the main features and functionalities of the app.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "tutorial",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "tutorial",
                            color: "bg_red_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "performance",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "performance",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Add analytics tracking to dashboard",
            description:
                "Implement analytics tracking on the dashboard to monitor user engagement and gather insights for future improvements.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "analytics",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "analytics",
                            color: "bg_orange_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Improve search functionality performance",
            description:
                "Optimize the search functionality to handle larger datasets more efficiently and return results faster.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "performance",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "performance",
                            color: "bg_yellow_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "security",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "security",
                            color: "bg_red_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Prepare marketing campaign for launch",
            description:
                "Develop and execute a marketing campaign to promote the upcoming launch of the app and attract new users.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "marketing",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "marketing",
                            color: "bg_lime_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Revise app's user feedback process",
            description:
                "Update and streamline the process for collecting and analyzing user feedback to enhance the app's development cycle.",
            status: "COMPLETED",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "feedback",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "feedback",
                            color: "bg_sky_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Set up continuous integration pipeline",
            description:
                "Establish a continuous integration pipeline to automate the build and testing processes for faster and more reliable deployments.",
            status: "IN_PROGRESS",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "ci",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "ci",
                            color: "bg_indigo_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Develop API documentation",
            description:
                "Create comprehensive API documentation to assist developers in integrating with the app's backend services and functionalities.",
            status: "IN_PROGRESS",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "api",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "api",
                            color: "bg_emerald_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "performance",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "performance",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Conduct user testing for new features",
            description:
                "Organize and execute user testing sessions for the newly implemented features to gather feedback and identify areas for improvement.",
            status: "IN_PROGRESS",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "testing",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "testing",
                            color: "bg_fuchsia_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "legal",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "legal",
                            color: "bg_red_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Update app's terms of service",
            description:
                "Revise and update the terms of service to reflect the latest changes in the app's policies and legal requirements.",
            status: "IN_PROGRESS",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "legal",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "legal",
                            color: "bg_red_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Refactor notification system",
            description:
                "Refactor the notification system to enhance its scalability and reliability, addressing any performance issues and improving userexperience.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "notification",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "notification",
                            color: "bg_orange_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "analytics",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "analytics",
                            color: "bg_orange_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "legal",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "legal",
                            color: "bg_red_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "database",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "database",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Optimize database queries for performance",
            description:
                "Review and optimize database queries to improve performance and reduce latency in data retrieval operations.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "database",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "database",
                            color: "bg_yellow_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Update mobile app to latest framework version",
            description:
                "Upgrade the mobile app to the latest version of the framework to take advantage of new features and improvements.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "database",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "database",
                            color: "bg_yellow_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "performance",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "performance",
                            color: "bg_yellow_200",
                        },
                    },
                    {
                        where: {
                            tagDesc: "upgrade",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "upgrade",
                            color: "bg_lime_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Revise user onboarding process",
            description:
                "Reevaluate and improve the user onboarding process to enhance user engagement and streamline the initial setup experience.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "onboarding",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "onboarding",
                            color: "bg_sky_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Implement app localization for new markets",
            description:
                "Add localization support to the app for new markets, including translations and region-specific features to better serve international users.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "localization",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "localization",
                            color: "bg_indigo_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Develop feature for exporting user data",
            description:
                "Create a feature that allows users to export their data from the app in various formats for personal use or transfer to other services.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "export",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "export",
                            color: "bg_emerald_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userId: user.id,
            title: "Enhance data encryption methods",
            description:
                "Upgrade the data encryption methods used within the app to ensure enhanced security and compliance with current best practices.",
            status: "BACKLOG",
            tags: {
                connectOrCreate: [
                    {
                        where: {
                            tagDesc: "encryption",
                        },
                        create: {
                            userId: user.id,
                            tagDesc: "encryption",
                            color: "bg_fuchsia_200",
                        },
                    },
                ],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    //Create Tasks
    tasks.forEach(async (task: any) => {
        const taskCreate = await prisma.task.create({
            data: task,
        });
    });
    console.log(`Seeded ${tasks.length} tasks`);

    //Create presets
    const presets = [
        {
            userId: user.id,
            name: "Quick study",
            focusTime: 120,
            breakTime: 20
        },
        {
            userId: user.id,
            name: "Deep Focus",
            focusTime: 180,  // 3 horas
            breakTime: 30
        },
        {
            userId: user.id,
            name: "Power Session",
            focusTime: 90,  // 1.5 horas
            breakTime: 15
        },
        {
            userId: user.id,
            name: "Balanced Work",
            focusTime: 150,  // 2.5 horas
            breakTime: 25
        },
        {
            userId: user.id,
            name: "Sprint Focus",
            focusTime: 45,  // 45 minutos
            breakTime: 10
        },
        {
            userId: user.id,
            name: "Easy Flow",
            focusTime: 60,  // 1 hora
            breakTime: 5
        }
    ];

    presets.forEach(async (preset: any) => {
        await prisma.preset.create({
            data: preset,
        });
    });
    console.log(`Seeded ${presets.length} presets`);
}

main();
