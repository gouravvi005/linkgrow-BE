import { Controller, Get, Param, Query } from '@nestjs/common';
import { scrumboardData, projectListData, projectDetailsData, tasksData, issueData } from '../mock-data/projectsData';
import { usersData } from '../mock-data/usersData';

@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return projectListData;
  }

  @Get('scrum-board')
  getScrumBoard() {
    return scrumboardData;
  }

  @Get('scrum-board/members')
  getScrumBoardMembers() {
    const borderMembersId = ['3', '2', '4', '7', '1', '10', '9'];
    const participantMembers = usersData.filter((user) =>
      borderMembersId.includes(user.id),
    );
    return {
      participantMembers,
      allMembers: usersData,
    };
  }

  @Get('tasks')
  getTasks() {
    return tasksData;
  }

  @Get('tasks/:id')
  getTask(@Param('id') id: string) {
    return issueData;
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    let project = projectListData.find((p) => p.id === id);
    if (!project) {
      project = projectListData[0];
    }
    return {
      ...projectDetailsData,
      ...project,
    };
  }
}
